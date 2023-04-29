import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, InputNumber } from "antd";
import "./Card.css";
const { Meta } = Card;

const gridStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: 30,
};

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  width: 240,
  minHeight: 600,
};

const generateDescription = (bookDetails) => {
  return `Author: ${bookDetails.author} | Pages: ${bookDetails.pages} | Release year: ${bookDetails.year} | Language: ${bookDetails.language} `;
};

const BookCard = () => {
  const [booksData, setBooksData] = useState([]);
  const [itemStock, setItemStock] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_GATEWAY_ENDPOINT}/gateway/books`)
      .then((response) => {
        setBooksData(response.data);
      });
  }, []);

  const handlePurchase = (bookDetails) => {
    if (itemStock > 0) {
      axios
        .put(
          `${process.env.REACT_APP_API_GATEWAY_ENDPOINT}/gateway/books/${bookDetails.id}`,
          { ...bookDetails, stockLeft: bookDetails.stockLeft - itemStock }
        )
        .then(() => {
          setBooksData((prevState) => [
            ...prevState.filter((book) => book.id !== bookDetails.id),
            ...[
              { ...bookDetails, stockLeft: bookDetails.stockLeft - itemStock },
            ],
          ]);
        });
    }
  };

  return (
    <div className="card-grid" style={gridStyle}>
      {booksData.map((bookDetails) => (
        <Card
          key={bookDetails.id}
          hoverable
          style={cardStyle}
          cover={
            <img alt={bookDetails.title} src={`${bookDetails.imageLink}`} />
          }
        >
          <Meta
            title={bookDetails.title}
            description={generateDescription(bookDetails)}
          />

          {bookDetails.stockLeft > 0 ? (
            <div
              style={{
                display: "flex",
              }}
            >
              <InputNumber
                style={{
                  position: "absolute",
                  bottom: 5,
                  left: 0,
                  background: "lemonchiffon",
                }}
                onChange={setItemStock}
                min={1}
                max={bookDetails.stockLeft}
                bordered
                status
              />

              <Button
                onClick={() => handlePurchase(bookDetails)}
                style={{
                  position: "absolute",
                  bottom: 5,
                  right: 10,
                }}
                type="primary"
              >
                Purchase Book
              </Button>
            </div>
          ) : (
            <></>
          )}
        </Card>
      ))}
    </div>
  );
};

export default BookCard;
