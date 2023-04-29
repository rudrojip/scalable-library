import React from "react";
import { Card } from "antd";
import { mockData } from "./mockData";
const { Meta } = Card;

const gridStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: 30,
};

const generateDescription = (bookDetails) => {
  return `Author: ${bookDetails.author} | Pages: ${bookDetails.pages} | Release year: ${bookDetails.year} | Language: ${bookDetails.language} `;
};

const BookCard = () => {
  return (
    <div className="card-grid" style={gridStyle}>
      {mockData.map((bookDetails, index) => (
        <Card
          key={index}
          hoverable
          style={{
            width: 240,
          }}
          cover={
            <img alt={bookDetails.title} src={`./${bookDetails.imageLink}`} />
          }
        >
          <Meta
            title={bookDetails.title}
            description={generateDescription(bookDetails)}
          />
        </Card>
      ))}
    </div>
  );
};

export default BookCard;
