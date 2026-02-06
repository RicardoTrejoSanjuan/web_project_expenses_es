/**
 * Percentage threshold used to determine warning balance state.
 * Example: 0.25 = 25% of the total budget.
 */
const percentageBudget = 0.25;

/**
 * Total available budget.
 * This value should be set externally.
 */
let budgetValue = 0;

/**
 * Accumulated total of all registered expenses.
 */
let totalExpensesValue = 0;

/**
 * Visual indicator for current balance status.
 * Possible values: "red", "orange", "green"
 */
let balanceColor = "green";

/**
 * Aggregated expenses by category.
 * Format: [category: string, totalAmount: number][]
 */
let categoriesData = [];

/**
 * Initial expense entries.
 * Each entry follows the structure: [category, amount]
 */
const expenseEntries = [
  ["groceries", 33],
  ["restaurants", 50],
  ["transport", 12],
  ["home", 70],
  ["subscriptions", 14],
  ["groceries", 28],
  ["subscriptions", 12],
];

/**
 * Initial calculation of total expenses.
 * This runs once on application startup.
 */
for (const [, amount] of expenseEntries) {
  totalExpensesValue += amount;
}

console.log(`Valor total de los gastos: $${totalExpensesValue}`);

/**
 * Calculates the average expense amount.
 * @returns {number} Average expense or 0
 */
function calculateAverageExpense() {
  if (expenseEntries.length === 0) return 0;
  return totalExpensesValue / expenseEntries.length;
}

/**
 * Calculates the current balance.
 * @returns {number} Remaining balance after expenses.
 */
function calculateBalance() {
  return budgetValue - totalExpensesValue;
}

/**
 * Updates the balance color based on remaining budget.
 * - red: negative balance
 * - orange: below warning threshold
 * - green: healthy balance
 */
function updateBalanceColor() {
  const balance = calculateBalance();
  const budgetWarningLimit = budgetValue * percentageBudget;
  if (balance < 0) {
    balanceColor = "red";
    return;
  }

  if (balance < budgetWarningLimit) {
    balanceColor = "orange";
    return;
  }

  balanceColor = "green";
}

/**
 * Calculates the total expense amount for a given category.
 * @param {string} category
 * @returns {number} total amount
 */
function calculateCategoryExpenses(category) {
  return expenseEntries.reduce((total, [currentCategory, amount]) => {
    return currentCategory === category ? total + amount : total;
  }, 0);
}

/**
 * Determines the category with the highest total expense.
 * @returns {string} category name
 */
function calculateLargestCategory() {
  categoriesData = [];

  let largestCategory = "";
  let maxCategory = 0;

  for (const [cat] of expenseEntries) {
    const totalCat = calculateCategoryExpenses(cat);
    if (totalCat > maxCategory) {
      maxCategory = totalCat;
      largestCategory = cat;
    }

    // Prevent duplicate category entries
    if (!categoriesData.some(([c]) => c === cat)) {
      categoriesData.push([cat, totalCat]);
    }
  }

  return largestCategory;
}

/**
 * Adds a new expense entry and updates the total expenses value
 * @param {[string, number]} newExpense
 */
function addExpenseEntry(newExpense) {
  expenseEntries.push(newExpense);
  totalExpensesValue += newExpense[1];
}
