import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostWidget from "./PostWidget";
import EmptyTamkeen from "./EmptyTamkeen";
import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import { fetchTamkeens, supportTamkeen } from "utils";
const PostsWidget = ({
  isAccessibility,
  isGivingHelp,
  isMental,
  isMotor,
  isHearing,
  isVisual,
  isPsychological,
}) => {
  const { posts } = useSelector((state) => state.posts);
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  //
  const isSmallMobileScreens = useMediaQuery("(max-width:450px)");
  //
  const handleSupportTamkeen = async (uri) => {
    await supportTamkeen({ uri, token });
    await fetchTamkeens(token, dispatch);
  };
  // get Tamkeens
  const getTamkeens = async () => {
    await fetchTamkeens(token, dispatch);
    setLoading(false);
  };
  // useEffect
  useEffect(() => {
    setLoading(true);
    getTamkeens();
  }, []);

  const fiterTamkeen = () => {
    return posts.filter((filteredPost) => {
      return (
        (typeof isAccessibility === "boolean"
          ? filteredPost?.isAccessibility === isAccessibility
          : filteredPost) &&
        (typeof isGivingHelp === "boolean"
          ? filteredPost?.isGivingHelp === isGivingHelp
          : filteredPost) &&
        (isMental ? filteredPost?.isMental === true : filteredPost) &&
        (isMotor ? filteredPost?.isMotor === true : filteredPost) &&
        (isHearing ? filteredPost?.isHearing === true : filteredPost) &&
        (isVisual ? filteredPost?.isVisual === true : filteredPost) &&
        (isPsychological
          ? filteredPost?.isPsychological === true
          : filteredPost)
      );
    });
  };
  return (
    <>
      {loading ? (
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
      ) : posts?.length > 0 ? (
        fiterTamkeen().length > 0 ? (
          <Box>
            <Box>
              {fiterTamkeen().map((post) => (
                <PostWidget
                  key={post?._id}
                  post={post}
                  user={user}
                  token={token}
                  supportTamkeen={handleSupportTamkeen}
                />
              ))}
            </Box>
            {isSmallMobileScreens && (
              <Box sx={{ height: "1rem", width: "100%" }}> </Box>
            )}
          </Box>
        ) : (
          <EmptyTamkeen />
        )
      ) : (
        <EmptyTamkeen />
      )}
    </>
  );
};

export default PostsWidget;
