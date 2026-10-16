
/**
 * Name: Sathvik Alla
 * Date: October 16, 2026
 * Course: IT-302-001
 * Assignment: Phase 3 C.U.D. MongoDB Data using Node.js
 * Email: sa3242@njit.edu
 */

import CommentsDAO from "../dao/commentsDAO.js";

export default class CommentsController {

    // POST: Create a comment about a Star Wars planet.
    static async apiPostComment(req, res) {
        try {
            const { starWarsId, userName, userId, text } = req.body;

            if (!starWarsId || !userName || !userId || !text) {
                return res.status(400).json({
                    status: "error",
                    message: "starWarsId, userName, userId, and text are required."
                });
            }

            const lastModified = new Date();

            const comment = {
                starWarsId,
                userName,
                userId,
                text,
                lastModified
            };

            const result = await CommentsDAO.addComment(comment);

            return res.status(201).json({
                status: "success",
                message: "Comment created successfully.",
                comment: {
                    _id: result.insertedId,
                    ...comment
                }
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                status: "error",
                message: "Unable to create comment."
            });
        }
    }

    // PUT: Update an existing comment.
    static async apiUpdateComment(req, res) {
        try {
            const { commentId, userId, text } = req.body;

            if (!commentId || !userId || !text) {
                return res.status(400).json({
                    status: "error",
                    message: "commentId, userId, and text are required."
                });
            }

            const lastModified = new Date();

            const result = await CommentsDAO.updateComment(
                commentId,
                userId,
                text,
                lastModified
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({
                    status: "error",
                    message: "Comment not found or user ID does not match."
                });
            }

            return res.status(200).json({
                status: "success",
                message: "Comment updated successfully.",
                comment: {
                    commentId,
                    userId,
                    text,
                    lastModified
                }
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                status: "error",
                message: "Unable to update comment."
            });
        }
    }

    // DELETE: Remove an existing comment.
    static async apiDeleteComment(req, res) {
        try {
            const { commentId, userId } = req.body;

            if (!commentId || !userId) {
                return res.status(400).json({
                    status: "error",
                    message: "commentId and userId are required."
                });
            }

            const result = await CommentsDAO.deleteComment(
                commentId,
                userId
            );

            if (result.deletedCount === 0) {
                return res.status(404).json({
                    status: "error",
                    message: "Comment not found or user ID does not match."
                });
            }

            return res.status(200).json({
                status: "success",
                message: "Comment deleted successfully.",
                commentId,
                userId
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                status: "error",
                message: "Unable to delete comment."
            });
        }
    }
}
