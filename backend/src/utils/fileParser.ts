import moment from "moment-timezone";

export const parseFile = (file: any) => {
  const content = file.buffer.toString();
  const lines = content.split("\n");

  const transactions = lines
    .map((line: string) => {
      const typeStr = line.slice(0, 1).trim();
      const type = typeStr ? parseInt(typeStr, 10) : NaN;

      if (isNaN(type)) {
        console.log(`Invalid type: ${typeStr}`);
        return null;
      }

      const dateString = line.slice(1, 26).trim();

      const date = moment(dateString, moment.ISO_8601).toDate();

      if (isNaN(date.getTime())) {
        console.log(`Invalid date: ${dateString}`);
        return null;
      }

      const product = line.slice(26, 56).trim().replace(/^\d+/g, "");
      const seller = line.slice(66, 86).trim().replace(/^\d+/g, "");

      if (!product || !seller) {
        console.log(`Invalid product or seller: ${product} - ${seller}`);
        return null;
      }

      const valueStr = line.slice(56, 66).trim();
      const value = valueStr ? parseInt(valueStr, 10) / 100 : 0;

      if (type && date && product && seller && value >= 0) {
        return {
          type,
          date,
          product,
          value,
          seller,
        };
      } else {
        return null;
      }
    })
    .filter((transaction: any) => transaction !== null);

  return transactions;
};
