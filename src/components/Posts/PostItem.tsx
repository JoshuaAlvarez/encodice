import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Flex,
  Icon,
  Image,
  Link,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import "moment/locale/es";
import { NextRouter, useRouter } from "next/router";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BsChat, BsDot } from "react-icons/bs";
import { FaLandmark } from "react-icons/fa";
import { Post, postState } from "../../atoms/postsAtom";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import { async } from "@firebase/util";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    topicId: string
  ) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  homePage?: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
  homePage,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const router = useRouter();
  const singlePostPage = !onSelectPost;

  const [error, setError] = useState(false);

  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);

      if (!success) {
        throw new Error("Failed to delete post");
      }

      console.log("Post was successfully deleted");
      if (singlePostPage) {
        router.push(`/tema/${post.topicId}`);
      }
    } catch (error: any) {
      setError(error.message);
    }
    setLoadingDelete(false);
  };

  return (
    <Flex
      border={"1px solid"}
      bg="white"
      borderColor={singlePostPage ? "white" : "gray.300"}
      borderRadius={singlePostPage ? "0px 0px 0px 0px" : "0px"}
      _hover={{ borderColor: singlePostPage ? "none" : "gray.500" }}
      cursor={singlePostPage ? "unset" : "pointer"}
      onClick={() => onSelectPost && onSelectPost(post)}
    >
      <Flex
        direction={"column"}
        align="center"
        bg={singlePostPage ? "none" : "white"}
        p={2}
        width="40px"
        borderRadius={singlePostPage ? "0" : "0px 0px 0px 0px"}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "green" : "gray.400"}
          fontSize={22}
          onClick={(event) => onVote(event, post, 1, post.topicId)}
          cursor="pointer"
        />
        <Text fontSize={"9pt"}>{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "red" : "gray.400"}
          fontSize={22}
          onClick={(event) => onVote(event, post, -1, post.topicId)}
          cursor="pointer"
        />
      </Flex>
      <Flex direction={"column"} width="100%">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text mr={2}>{error}.</Text>
          </Alert>
        )}
        <Stack spacing={1} p="10px">
          <Stack
            direction={"row"}
            spacing={0.6}
            align="center"
            fontSize={"9pt"}
          >
            {/* Home Page Check */}
            {homePage && (
              <>
                {post.topicImageURL ? (
                  <Image
                    src={post.topicImageURL}
                    borderRadius="full"
                    boxSize={10}
                    mr={2}
                    alt="topic-image"
                  />
                ) : (
                  <Icon
                    as={FaLandmark}
                    fontSize="18pt"
                    mr={1}
                    color="blue.600"
                  />
                )}
                <Link href={`tema/${post.topicId}`}>
                  <Text
                    fontWeight={700}
                    _hover={{ textDecoration: "underline" }}
                    onClick={(event) => event.stopPropagation()}
                  >{`${post.topicId}`}</Text>
                </Link>
                <Icon as={BsDot} color="gray.500" fontSize={8} />
              </>
            )}
            {moment.locale("es")}
            <Text>
              Creado por {post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize={"12pt"} fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize={"10pt"}>{post.body}</Text>
          {post.imageURL && (
            <Flex justify={"center"} align="center" p={2}>
              {loadingImage && (
                <Skeleton height={"200px"} width="100%" borderRadius={4} />
              )}
              <Image
                src={post.imageURL}
                maxHeight="460px"
                alt="Imagen del post"
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
              />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color="gray.500">
          <Flex
            align={"center"}
            p="8px 10px"
            borderRadius={1}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize={"9pt"}>{post.numberOfComments}</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align={"center"}
              p="8px 10px"
              borderRadius={1}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={handleDelete}
            >
              {loadingDelete ? (
                <Spinner size={"sm"} />
              ) : (
                <>
                  <Icon as={RiDeleteBin2Line} mr={2} />
                  <Text fontSize={"9pt"}>Eliminar</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostItem;
