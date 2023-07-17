const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name:{
        type: mongoose.SchemaTypes.String,
        required: [true, "Please add a name"]
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: [true, "Please add a email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"
        ]
    },
    password:{
        type: mongoose.SchemaTypes.String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be up to 6 characters"],
        // maxLength: [64, "Password must not be up more than 23 characters" ]
    },
    photo: {
        type: mongoose.SchemaTypes.String,
        required: [true, "Please add a photo"],
        default: "https://es.gravatar.com/userimage/234587575/f926624bd38d6e1f5f77cffd1c63df33.png"
    },
    phone: {
        type: mongoose.SchemaTypes.String,
        default: "+57"
    },
    bio: {
        type: mongoose.SchemaTypes.String,
        default:"bio",
        maxLength: [250, "Bio must not be up more than 250 characters" ]
    }
}, {
    timestamps: true
});

// Encrypt password before saving to DB
userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        return next();
    }

    //Hashed password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
})


module.exports = mongoose.model("User", userSchema);