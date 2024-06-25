'strict mode';
//冻结freeze,不是深度冻结，只是冻结第一层
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
}); //这样就无法修改了
// spendingLimits.jonas = 10;
// spendingLimits.jay = 10;
// console.log(spendingLimits);
// budget[1].user = 'lijun';
// console.log(budget[1].user);//输出lijun
const putLimlt = function (limits, user) {
  return limits?.[user] ?? 0;
};
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  // if (!user) user = 'jonas';
  const cleanUser = user.toLowerCase();

  // let lim;
  // if (spendingLimits[user]) {
  //   lim = spendingLimits[user];
  // } else {
  //   lim = 0;
  // }
  // const lim = spendingLimits[user] ? spendingLimits[user]:0;
  const lim = putLimlt(limits, cleanUser);
  // if (value <= lim) {
  //   // budget.push({ value: -value, description: description, user: user });
  //   budget.push({ value: -value, description, cleanUser });
  // }
  return value <= lim
    ? [...state, { value: -value, description, cleanUser }]
    : budget;
};
const newBu1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
// console.log(newbu1);
const newBu2 = addExpense(
  newBu1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
// console.log(newbu2);
addExpense(budget, spendingLimits, 200, 'Stuff', 'Jay');
console.log(budget);

const checkExpenses = function (limits, state) {
  return state.map(entry => {
    return entry.value < -putLimlt(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry;
  });
  // for (const entry of state) {
  //   if (entry.value < -putLimlt(limits,entry.user)) {
  //     entry.flag = 'limit';
  //   }
  // }
};
const cheakbu = checkExpenses(spendingLimits, newBu2);

console.log(cheakbu);

const logBigExpenses = function (state, passLimlt) {
  const bigGuy = state
    .filter(entry => entry.value <= -passLimlt)
    // .map(entry => entry.description.slice(-2))
    // .join('/');
    .reduce((str, cur) => {
      return `${str} / ${cur.description.slice(-2)}`;
    }, '');
  console.log(bigGuy);
  // let output = '';
  // for (const entry of budget) {
  //   output +=
  //     entry.value <= -passLimlt ? `${entry.description.slice(-2)} /` : '';
  // }
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};
logBigExpenses(cheakbu, 10);
const logExpensesAll = function (state) {
  return state.reduce((acc, cur) => acc + cur.value, 0);
};
console.log(logExpensesAll(cheakbu));
