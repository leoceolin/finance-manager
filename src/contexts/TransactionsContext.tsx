import { ReactNode, useEffect, useState, useCallback } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface ITransactionsProvider {
  children: ReactNode
}

interface CreateNewTransaction {
  description: string
  price: number
  category: string
  type: string
}

interface ITransactionContext {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateNewTransaction) => Promise<void>
}

export const TransactionContext = createContext({} as ITransactionContext)

export function TransactionsProvider({ children }: ITransactionsProvider) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const { data } = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(data)
  }, [])

  const createTransaction = useCallback(
    async (dataCreateNewTransaction: CreateNewTransaction) => {
      const { description, price, category, type } = dataCreateNewTransaction
      const { data } = await api.post('transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })
      setTransactions((state) => [data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
