/**
 * Name: Sathvik Alla
 * Date: October 16, 2026
 * Course: IT-302-001
 * Assignment: Phase 3 C.U.D. MongoDB Data using Node.js
 * Email: sa3242@njit.edu
 */

import { ObjectId } from "mongodb";
let comments;

export default class CommentsDAO {
    static async injectDB(conn) {
        if (comments) {
            return;
        }
        try {
            comments = conn.db(process.env.STARWARS_NS).collection("comments_sa3242");

            console.log("Comments collection initialized successfully.");
        } catch (err) {
            console.error(
                `Unable to establish a collection handle in CommentsDAO: ${err}`
            ); throw err;
        }
    }

    static async addComment(comment) {
        try{
            return await comments.insertOne(comment);
        } catch (err) {
            console.error(`Unable to add comment: ${err}`);
            throw err;
        }
    }

    static async updateComment(commentId, userId, text,lastModified) {
        try {
            return await comments.updateOne(
                {
                    _id: new ObjectId(commentId),
                    userId: userId,
                },
                {
                    $set: { text: text, lastModified: lastModified },
                }
            );
        } catch (err) {
            console.error(`Unable to update comment: ${err}`);
            throw err;
        }
    }

    static async deleteComment(commentId, userId) {
        try {
            return await comments.deleteOne({
                _id: new ObjectId(commentId),
                userId: userId,
            });
        } catch (err) {
            console.error(`Unable to delete comment: ${err}`);
            throw err;
        }
    }
}
