import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./style";

interface ITransaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

export function Transactions() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  async function loadTransactions() {
    const response = await fetch("http://localhost:3333/transactions");
    const data = await response.json();
    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);
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
