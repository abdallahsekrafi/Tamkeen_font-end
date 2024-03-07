import {
  Accessibility,
  ModeCommentOutlined,
  AlternateEmail,
  Message,
  Public,
  Reply,
  Send,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import ProfilAvatar from "components/ProfilAvatar";
import WidgetWrapper from "components/WidgetWrapper";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "utils";

const CommentForm = ({ user, replyAt, id, token, getComments }) => {
  const { palette } = useTheme();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const URL = !replyAt
        ? "/posts/comment/" + id
        : "/posts/reply-comment/" + id;
      const newData = {
        comment,
        from: user?.firstName + " " + user?.lastName,
        replyAt,
      };
      const res = await apiRequest({
        url: URL,
        data: newData,
        token,
        method: "POST",
      });
      if (res?.success === "failed") {
        console.log(res?.message);
      } else {
        setComment("");
        await getComments(id);
        //await fetchTamkeens(token, dispatch);
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };
  return (
    <Box sx={{ display: "flex", p: "1rem 0rem 0rem 1rem  " }}>
      <ProfilAvatar
        profilName={`${user?.firstName} ${user?.lastName}`}
        profilImg={user?.profileUrl}
        profilSize={32}
      />
      <InputBase
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{
          padding: "0 0.3rem",
          flexGrow: 1,
          borderRadius: "2rem",
        }}
        placeholder="Comment this tamkeen"
      />
      <LoadingButton
        disabled={!comment}
        onClick={onSubmit}
        loading={isSubmitting}
        loadingPosition="center"
        loadingIndicator={<CircularProgress color="info" size={24} />}
        sx={{
          minHeight: 0,
          minWidth: 0,
          padding: 0,
          "&:hover": {
            background: "none",
          },
        }}
      >
        <Send
          sx={{
            color: comment ? palette.primary.baseBlue : "secondary",
          }}
        />
      </LoadingButton>
    </Box>
  );
};

const PostWidget = ({ post, user, token, supportTamkeen }) => {
  const [showAll, setShowAll] = useState(0);
  // theme
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  // responsive
  const isMin1400 = useMediaQuery("(min-width:1400px)");
  const isMin1300 = useMediaQuery("(min-width:1300px)");
  const isMin950 = useMediaQuery("(min-width:950px)");
  const isMin1150 = useMediaQuery("(min-width:1150px)");
  const isSmallMobileScreens = useMediaQuery("(max-width:450px)");
  const hSize = 18;
  const dSize = isMin1400
    ? 32
    : isMin1300
    ? 24
    : isMin1150
    ? 24 //16
    : isMin950
    ? 32
    : isSmallMobileScreens
    ? 22
    : 24;

  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [replyComments, setReplyComments] = useState(0);
  const [showCommentsForm, setShowCommentsForm] = useState(0);
  const [showComments, setShowComments] = useState(0);
  const [loadingComments, setLoadingComments] = useState(false);

  const getTamkeensComments = async (id) => {
    try {
      const res = await apiRequest({
        url: "posts/comments/" + id,
        method: "GET",
        token: token,
      });
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async (id) => {
    setLoadingComments(true);
    setReplyComments(0);
    const result = await getTamkeensComments(id);
    setComments(result);
    setLoadingComments(false);
  };
  const handleSupportTamkeen = async (uri) => {
    await supportTamkeen(uri);
    //await getComments(post?._id);
  };
  return (
    <WidgetWrapper
      m={!isSmallMobileScreens ? "1rem 0.1rem" : "0.1rem 0"}
      sx={{ boxShadow: 3 }}
    >
      <FlexBetween>
        <FlexBetween gap={isSmallMobileScreens ? "0.5rem" : "1rem"}>
          <ProfilAvatar
            profilName={`${post?.userId?.firstName} ${post?.userId?.lastName}`}
            profilImg={post?.userId?.profileUrl}
          />
          <Box
            onClick={() => {
              navigate(`/profile/${post?.userId?._id}`);
            }}
          >
            <Typography
              color={main}
              variant={isSmallMobileScreens ? "h6" : "h5"}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.dark,
                  cursor: "pointer",
                },
              }}
            >
              {`${post?.userId?.firstName} ${post?.userId?.lastName}`}
            </Typography>
            <Box
              gap="0.25rem"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Typography color={medium} fontSize="0.75rem">
                {moment(post?.createdAt).fromNow()}
              </Typography>
              <Typography color={medium} fontSize="0.75rem">
                .
              </Typography>
              {post?.isGivingHelp ? (
                <Avatar
                  sx={{ width: hSize, height: hSize }}
                  alt="giving help"
                  src="/assets/giv_help.svg"
                />
              ) : (
                <Avatar
                  sx={{ width: hSize, height: hSize }}
                  alt="asking for help"
                  src="/assets/ask_help.svg"
                />
              )}
              <Divider orientation="vertical" flexItem />
              {post?.isAccessibility ? (
                <Accessibility color="primary" />
              ) : (
                <Public color="primary" />
              )}
            </Box>
          </Box>
        </FlexBetween>
        <Box
          gap="0.25rem"
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {post?.isMental && (
            <Avatar
              sx={{ width: dSize, height: dSize }}
              alt="mental"
              src="/assets/mental.svg"
            />
          )}
          {post?.isMotor && (
            <Avatar
              sx={{ width: dSize, height: dSize }}
              alt="motor"
              src="/assets/motor.svg"
            />
          )}
          {post?.isHearing && (
            <Avatar
              sx={{ width: dSize, height: dSize }}
              alt="hearing"
              src="/assets/hearing.svg"
            />
          )}
          {post?.isVisual && (
            <Avatar
              sx={{ width: dSize, height: dSize }}
              alt="visual"
              src="/assets/visual.svg"
            />
          )}
          {post?.isPsychological && (
            <Avatar
              sx={{ width: dSize, height: dSize }}
              alt="psychological"
              src="/assets/psychological.svg"
            />
          )}
        </Box>
      </FlexBetween>
      <Typography color={main} sx={{ mt: "1rem", mb: "0.5rem" }}>
        {showAll === post?._id
          ? post?.description
          : post?.description.slice(0, 300)}

        {post?.description?.length > 301 &&
          (showAll === post?._id ? (
            <span
              style={{
                color: palette.primary.baseBlue,
                fontSize: 14,
                cursor: "pointer",
              }}
              onClick={() => setShowAll(0)}
            >
              Show Less
            </span>
          ) : (
            <span
              style={{
                color: palette.primary.baseBlue,
                fontSize: 14,
                cursor: "pointer",
              }}
              onClick={() => setShowAll(post?._id)}
            >
              Show More
            </span>
          ))}
      </Typography>
      {post?.image && (
        <img
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "30rem",
            borderRadius: "0.5rem",
            objectFit: "fill",
            mb: "0.5rem",
          }}
          alt="post"
          src={post?.image}
        />
      )}
      {/* support and comment count */}
      {(post?.supports?.length > 0 || post?.comments?.length > 0) && (
        <FlexBetween sx={{ mt: "0.25rem" }}>
          {post?.supports?.length > 0 ? (
            <FlexBetween>
              <IconButton>
                <Avatar
                  sx={{ width: "18px", height: "18px" }}
                  alt="support"
                  src="/assets/support.svg"
                />
              </IconButton>
              <Typography fontSize={isSmallMobileScreens && "0.8rem"}>
                {post?.supports?.length}
              </Typography>
            </FlexBetween>
          ) : (
            <Box />
          )}

          {post?.comments?.length > 0 || comments?.length > 0 ? (
            <FlexBetween
              onClick={() => {
                !showComments && getComments(post?._id);
                setShowComments(showComments === post?._id ? null : post?._id);
              }}
            >
              <Typography fontSize={isSmallMobileScreens && "0.8rem"}>
                {Math.max(post?.comments?.length, comments?.length)}
              </Typography>
              <IconButton>
                <Message sx={{ width: "18px", height: "18px" }} />
              </IconButton>
            </FlexBetween>
          ) : (
            <Box />
          )}
        </FlexBetween>
      )}
      <Divider sx={{ mb: "0.25rem" }} />
      <FlexBetween>
        <FlexBetween
          gap="0.25rem"
          sx={{ cursor: "pointer" }}
          onClick={() => handleSupportTamkeen("/posts/support/" + post?._id)}
        >
          <IconButton sx={{ padding: 0 }}>
            <Avatar
              sx={{ width: dSize, height: dSize, padding: "0.1rem" }}
              alt="support"
              src={
                post?.supports?.includes(user?._id)
                  ? "/assets/supported.svg"
                  : palette.mode === "dark"
                  ? "/assets/unsupport.svg"
                  : "/assets/unsupportdark.svg"
              }
            />
          </IconButton>
          <Typography fontSize={isSmallMobileScreens && "0.7rem"}>
            Support
          </Typography>
        </FlexBetween>

        <FlexBetween
          gap="0.25rem"
          sx={{ cursor: "pointer" }}
          onClick={() => console.log("tag frends")}
        >
          <IconButton sx={{ padding: 0 }}>
            <AlternateEmail sx={{ width: dSize, height: dSize }} />
          </IconButton>
          <Typography fontSize={isSmallMobileScreens && "0.7rem"}>
            Tag Frends
          </Typography>
        </FlexBetween>

        <FlexBetween
          gap="0.25rem"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setShowCommentsForm(
              showCommentsForm === post?._id ? null : post?._id
            );
          }}
        >
          <IconButton sx={{ padding: 0 }}>
            <ModeCommentOutlined sx={{ width: dSize, height: dSize }} />
          </IconButton>
          <Typography fontSize={isSmallMobileScreens && "0.7rem"}>
            Comment
          </Typography>
        </FlexBetween>

        <FlexBetween
          gap="0.25rem"
          sx={{ cursor: "pointer" }}
          onClick={() => console.log("retamkeen")}
        >
          <IconButton sx={{ padding: 0 }}>
            <Reply
              sx={{
                width: dSize,
                height: dSize,
                WebkitTransform: "scalex(-1)",
                transform: "scalex(-1)",
              }}
            />
          </IconButton>
          <Typography fontSize={isSmallMobileScreens && "0.7rem"}>
            ReTamkeen
          </Typography>
        </FlexBetween>
      </FlexBetween>

      {showCommentsForm === post?._id && (
        <>
          <Divider sx={{ m: "0.25rem 0" }} />
          <CommentForm
            user={user}
            id={post?._id}
            getComments={getComments}
            token={token}
          />
        </>
      )}
      {showComments === post?._id &&
        comments?.length > 0 &&
        !showCommentsForm && <Divider sx={{ m: "0.25rem 0" }} />}
      {showComments === post?._id &&
        comments?.length > 0 &&
        (loadingComments ? (
          <Box
            sx={{
              display: "flex",
              mt: "2rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        ) : (
          comments.map((comment) => (
            <Box
              key={comment?._id}
              sx={{
                display: "flex",
                flexDirection: "column",
                p: "1rem 0rem 0rem 1rem  ",
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}
              >
                <ProfilAvatar
                  profilName={`${comment?.userId?.firstName} ${comment?.userId?.lastName}`}
                  profilImg={comment?.userId?.profileUrl}
                  profilSize={32}
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    color={main}
                    variant="h5"
                    fontWeight="500"
                    sx={{
                      "&:hover": {
                        color: palette.primary.light,
                        cursor: "pointer",
                      },
                    }}
                  >
                    {`${comment?.userId?.firstName} ${comment?.userId?.lastName}`}
                  </Typography>
                  <Typography color={medium} fontSize="0.75rem">
                    {moment(comment?.createdAt).fromNow()}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  ml: "2.75rem",
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.25rem",
                }}
              >
                <Divider orientation="vertical" flexItem />
                <Typography color={main}>{comment?.comment}</Typography>
              </Box>
            </Box>
          ))
        ))}
    </WidgetWrapper>
  );
};

export default PostWidget;
