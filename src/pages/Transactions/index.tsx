import { useContext } from 'react'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './style'
import { TransactionContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'

export function Transactions() {
  const { transactions } = useContext(TransactionContext)

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.length &&
              transactions.map(
                ({ id, description, category, type, price, createdAt }) => {
                  return (
                    <tr key={id}>
                      <td width="40%">{description}</td>
                      <td>
                        <PriceHighlight variant={type}>
                          {type === 'outcome' && '- '}
                          {priceFormatter.format(price)}
                        </PriceHighlight>
                      </td>
                      <td>{category}</td>
                      <td>{dateFormatter.format(new Date(createdAt))}</td>
                    </tr>
                  )
                },
              )}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
