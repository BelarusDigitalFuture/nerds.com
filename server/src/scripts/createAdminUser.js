const userService = require('../resources/user/user.service');

const userData = {
  email: 'admin@geekcon.online.com',
  password: 'Ohchah4i',
  name: 'admin',
};

const run = async () => {
  const existingUser = await userService.findOne({ email: userData.email });
  if (existingUser) {
    console.error(`User with email ${userData.email} already exists, id - ${existingUser._id}`);
    return;
  }

  let user = await userService.createUserAccount({ userData });
  console.info(user._id);
};

run()
  .then(() => {
    console.info('Success');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
