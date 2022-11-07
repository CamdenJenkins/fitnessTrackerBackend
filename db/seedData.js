const users = [
  {
    username: "albert",
    password: "bertie99",
  },
  {
    username: "sandra",
    password: "2sandyme",
  },
  {
    username: "glamgal",
    password: "soglam",
  },
];

const routines = [
  {
    creator_id: 1,
    is_public: true,
    name: "Leg Day",
    goal: "Huge Quads!",
  },
  {
    creator_id: 2,
    is_public: true,
    name: "Arms",
    goal: "Big Biceps",
  },
  {
    creator_id: 3,
    is_public: true,
    name: "Chest",
    goal: "Big Pecs!",
  },
  {
    creator_id: 1,
    is_public: false,
    name: "Back Day",
    goal: "Huge Lats!",
  },
];

const activities = [
  {
    name: "Squats",
    description: "Bascially like sitting",
  },
  {
    name: "Leg Press",
    description: "Push Hard",
  },
  {
    name: "Bicep curls",
    description: "curl your arm",
  },
  {
    name: "Bench Press",
    description: "push with arms",
  },
];

const routine_activities = [
  {
    routine_id: 1,
    activity_id: 1,
    duration: 10,
    count: 30,
  },

  {
    routine_id: 1,
    activity_id: 2,
    duration: 20,
    count: 50,
  },

  {
    routine_id: 2,
    activity_id: 3,
    duration: 5,
    count: 20,
  },

  {
    routine_id: 3,
    activity_id: 1,
    duration: 15,
    count: 25,
  },
];

module.exports = { users, activities, routines, routine_activities };
