import { UserSchema } from '../user.entity';

export const preSaveHook = () => {
  const schema = UserSchema;
  schema.pre('save', function () {
    this.username = String(this._id);
  });
  return schema;
};
