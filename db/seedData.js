const users = [
  {
    id: 1,
    username: "albert",
    password: "bertie99",
  },
  {
    id: 2,
    username: "sandra",
    password: "2sandyme",
  },
  {
    id: 3,
    username: "glamgal",
    password: "soglam",
  },
];

const routines = [
  {
    id: 1,
    creator_id: 1,
    is_public: true,
    name: "Leg Day",
    goal: "Huge Quads!",
  },
  {
    id: 2,
    creator_id: 2,
    is_public: true,
    name: "Arms",
    goal: "Big Biceps",
  },
  {
    id: 3,
    creator_id: 3,
    is_public: true,
    name: "Chest",
    goal: "Big Pecs!",
  },
];

const activities = [
  {
    id: 1,
    name: "Squats",
    description: "Bascially like sitting",
  },
  {
    id: 2,
    name: "Leg Press",
    description: "Push Hard",
  },
  {
    id: 3,
    name: "Bicep curls",
    description: "curl your arm",
  },
];
module.exports = { users, activities, routines };
