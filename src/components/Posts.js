import React from 'react'
import PropTypes from 'prop-types'

const Posts = ({posts}) => (
    <div>
        {posts.map((post, i) =>
            <p className="ui floating message" key={i}>{post.title}</p>
        )}
    </div>
)

Posts.propTypes = {
    posts: PropTypes.array.isRequired
}

export default Posts
