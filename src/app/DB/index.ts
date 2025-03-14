import env from "../config";
import { USER_ROLE } from "../modules/user/constant/user.constant";
import { User } from "../modules/user/model/user.model";

const seedAdminUser = {
  name: {
    firstName: "Admin1017",
    lastName: "Admin",
  },
  email: "admin1017@admin.com",
  role: "admin",
  profileImg: "",
  password: env.ADMIN_PASSWORD,
  gender: "others",
  isDeleted: false,
};

const seedAdmin = async () => {
  // when database is connected, we will check who is super admin
  const admin = await User.findOne({ role: USER_ROLE.admin });

  if (!admin) {
    await User.create(seedAdminUser);
  }
};

export default seedAdmin;
