import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: String,
      required: true,
      default: 'Customer'
    }

  },
  {
    timestamps: true,
  }
)


// This method compares the entered password with the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Define a pre-save hook on the userSchema object
// This hook is triggered before a user is saved to the database
userSchema.pre('save', async function (next) {
  // Check if the password field has been modified
  if (!this.isModified('password')) {
    next()
  }
  // Generate a salt to be used when hashing the password
  const salt = await bcrypt.genSalt(10)
  // Hash the password using the salt and replace the plain text password with the hashed password
  this.password = await bcrypt.hash(this.password, salt)
})


const User = mongoose.model('User', userSchema)

export default User
