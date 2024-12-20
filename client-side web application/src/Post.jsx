
function Post({ post }) {

  return (
    <div className="post-container">
      <p>
        <span className="user-info-label">Title:</span>
        {post.title}
      </p>

      <p>
        <span className="user-info-label">Body:</span>
        {post.body}
      </p>

    </div>
  )
}

export default Post
