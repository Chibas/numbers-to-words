import { NumberFormatter } from "./numberFormatter";
const number = Number(process.argv[2]);

const formatter = new NumberFormatter();

try {
  const result = formatter.format(number);
  console.log(result);
  process.exit(0);
} catch (err) {
  console.error(err);
  process.exit(1)
}