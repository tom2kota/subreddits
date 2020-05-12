import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit} from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class App extends Component {
    static propTypes = {
        selectedSubreddit: PropTypes.string.isRequired,
        posts: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const {dispatch, selectedSubreddit} = this.props
        dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedSubreddit !== this.props.selectedSubreddit) {
            const {dispatch, selectedSubreddit} = this.props
            dispatch(fetchPostsIfNeeded(selectedSubreddit))
        }
    }

    handleChange = nextSubreddit => {
        this.props.dispatch(selectSubreddit(nextSubreddit))
    }

    handleRefreshClick = e => {
        e.preventDefault()

        const {dispatch, selectedSubreddit} = this.props
        dispatch(invalidateSubreddit(selectedSubreddit))
        dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }

    render() {
        const {selectedSubreddit, posts, isFetching, lastUpdated} = this.props
        const isEmpty = posts.length === 0
        return (
            <div className="ui container">

                <div className="ui segments">

                    <div className="ui massive center aligned segment">
                        <div className="header">
                            Welcome to our site!
                        </div>
                        <p>Render <a className="ui teal header"
                                     href="https://www.reddit.com/subreddits">SubReddits</a> -
                            React Redux App</p>
                    </div>


                    <form className="ui form center aligned secondary segment ">

                        <div className="two fields">

                            <div className="field">
                                <Picker value={selectedSubreddit} onChange={this.handleChange}
                                        options={['home', 'pics', 'funny']}/>
                            </div>

                            <div className="field">
                                {!isFetching &&
                                <button onClick={this.handleRefreshClick} className="ui teal button">REFRESH</button>
                                }
                            </div>

                        </div>
                    </form>
                </div>


                {lastUpdated &&
                <div className="ui bottom  warning floating message">
                    Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                    {' '}
                </div>
                }


                <div>
                    {isEmpty
                        ? (isFetching ?
                            <div className="ui active centered inline loader"></div>
                            :
                            <div className="ui bottom  warning floating message"><h2><i className="icon warning"/>
                                Something went wrong ... Empty.</h2></div>)
                        : <div style={{opacity: isFetching ? 0.5 : 1}}>
                            <Posts posts={posts}/>
                        </div>
                    }
                </div>


            </div>
        )
    }
}

const mapStateToProps = state => {
    const {selectedSubreddit, postsBySubreddit} = state
    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsBySubreddit[selectedSubreddit] || {
        isFetching: true,
        items: []
    }

    return {
        selectedSubreddit,
        posts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(App)
