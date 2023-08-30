import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./style";
import { TransactionContext } from "../../contexts/TransactionsContext";

export function Transactions() {
  const { transactions } = useContext(TransactionContext);

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
                        <PriceHighlight variant={type}>{price}</PriceHighlight>
                      </td>
                      <td>{category}</td>
                      <td>{createdAt}</td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
