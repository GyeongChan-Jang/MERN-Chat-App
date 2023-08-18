const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
} = require("../controller/chatControllers");

const router = express.Router();

// 방 생성
router.route("/").post(protect, accessChat);
// 방 조회
router.route("/").get(protect, fetchChats);
// 그룹 방 생성
router.route("/group").post(protect, createGroupChat);
// 방 이름 수정
router.route("/rename").put(protect, renameGroup);
// 그룹 방 삭제
// router.route('/groupremove).put(protect, removeFromGroup)
// 그룹방에 초대
// router.route('/groupadd').put(protect, addToGroup)

module.exports = router;
