export const getTransactionsByCurrentMonth = async() => {
  const expenses = await daoGetTransactionsByCurrentMonth();
  return expenses;
}