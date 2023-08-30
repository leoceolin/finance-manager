import { useMemo } from 'react'
import { useContextSelector } from 'use-context-selector'
import { TransactionContext } from '../../contexts/TransactionsContext'

export function useSummary() {
  const transactions = useContextSelector(
    TransactionContext,
    (context) => context.transactions,
  )

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        const { type, price } = transaction
        if (type === 'income') {
          acc.income += price
          acc.total += price
        } else {
          acc.outcome += price
          acc.total -= price
        }
        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactions])

  return summary
}
