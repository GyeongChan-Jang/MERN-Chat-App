const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// user 스키마 정의
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picture: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

// 화살표 함수 안먹음 ㅋㅋㅋㅋ
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// pre, post 메소드 -> 각각 특정 동작 이전, 이후에 어떤 행동을 할지 정의하는 미들웨어
// 화살표 함수 안먹음 ㅋㅋㅋㅋ
userSchema.pre("save", async function (next) {
  // 'save'하기 전 호출됨, next를 실행하지 않으면 save되지 않음
  if (!this.isModified) {
    next();
  }
  // user 비밀번호 암호화
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 스키마 등록 User -> 소문자화 후 복수형 -> users 컬렉션 생성
const User = mongoose.model("User", userSchema);

module.exports = User;
