import React from "react";
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Animated
} from "react-native";
import { Card, Button } from "react-native-elements";

import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import { connect } from "react-redux";
import { fetchData } from "../actions";
import { isSignedIn } from "../api/auth";

let styles;

function calculateFontSize(likes) {
  return likes > 0 ? Math.atan(likes) * 14 : 11;
}

class CommentBox extends React.Component {
  state = {
    commentText: ''
  }

  render() {
    const { commentBox, text, button, buttonText, commentBoxInput } = styles;
    const { commentText } = this.state;
    const { actions } = this.props;

    return (
      <View style={commentBox}>
        <TextInput
          style={commentBoxInput}
          multiline={true}
          numberOfLines={4}
          value={commentText}
          onChangeText={commentText => this.setState({ commentText })}
          maxLength={280}
        />
        <Button
          backgroundColor="#0b7eff"
          title="COMMENT IT"
          onPress={() => {
            if (commentText) {
              actions.sendData({
                tweetText: commentText,
                author: "5a349ce460c6090004150d4c",
                like_counter: 0,
                comment_counter: 0
              });
              this.setState({ commentText: "" });
            }
          }}
        />
      </View>
    )
  }
}

const CommentList = ({comments = []}) => {
  return (<View>
    {comments && comments.map(comment => {
      return (
        <View key={comment._id} style={styles.commentItem}>
          <Text style={styles.commentAuthor}>{comment.author}</Text>
          <Text>{comment.comment}</Text>
        </View>
      )
    })}
  </View>
  );
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { yellText: "" };
  }

  componentDidMount() {
    this.props.actions.fetchData();
  }

  render() {
    const { appData, actions, fetchComments } = this.props;
    const { yellText } = this.state;
    const { container, text, button, buttonText, mainContent, scrollView } = styles;

    let { isExpanded } = appData;

    return (
      <View style={container}>
        <TextInput
          style={styles.yellInput}
          multiline={true}
          numberOfLines={4}
          value={yellText}
          onChangeText={yellText => this.setState({ yellText })}
          maxLength={280}
        />
        <Button
          backgroundColor="#0b7eff"
          title="YELL IT"
          onPress={() => {
            if (yellText) {
              actions.sendData({
                tweetText: yellText,
                author: "5a349ce460c6090004150d4c",
                like_counter: 0,
                comment_counter: 0
              });
              this.setState({ yellText: "" });
            }
          }}
        />

        <View style={mainContent}>
          <ScrollView style={scrollView}>
            {appData.data && appData.data.length
              ? appData.data.map((yell, i) => {
                  const yellViewStyles = [
                    styles.yellView,
                    appData.expandedYell === yell._id ? styles.yellViewExpanded : null
                  ].filter(Boolean);
                  return (
                    <View style={yellViewStyles} key={yell._id}>
                      <TouchableHighlight
                        style={styles.yellText}
                        onPress={() => {
                            const id = appData.expandedYell === yell._id ? null : yell._id;
                            actions.expandYell(id);
                            fetchComments(id);
                          }
                        }
                      >
                        <Text
                          style={{
                            fontFamily: "Cochin",
                            fontSize: calculateFontSize(yell.like_counter)
                          }}
                        >
                          {yell.tweetText}
                        </Text>
                      </TouchableHighlight>
                      {appData.expandedYell === yell._id ? (<CommentList comments={appData.comments}></CommentList>) : null}
                      {appData.expandedYell === yell._id ? (<CommentBox actions={actions}></CommentBox>) : null}
                      <View style={styles.yellFooter}>
                        <TouchableHighlight
                          onPress={() =>
                            isSignedIn().then(author =>
                              actions.applaude({
                                yellId: yell._id,
                                author: author
                              })
                            )}
                        >
                          <Image
                            style={styles.likeIcon}
                            source={require("../img/likeicon.png")}
                          />
                        </TouchableHighlight>
                        <Text style={styles.yellLike}>{yell.like_counter}</Text>
                        <TouchableHighlight onPress={() => alert("comment")}>
                          <Image
                            style={styles.commentIcon}
                            source={require("../img/commenticon.png")}
                          />
                        </TouchableHighlight>
                        <Text style={styles.yellComment}>
                          {yell.comment_counter}
                        </Text>
                      </View>
                    </View>
                  );
                })
              : null}
          </ScrollView>
        </View>
      </View>
    );
  }
}

styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 10,
    display: 'flex'
  },
  yellInput: {
    height: 80,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    padding: 5
  },
  text: {
    textAlign: "center"
  },
  button: {
    height: 60,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0b7eff"
  },
  buttonText: {
    color: "white"
  },
  mainContent: {
    margin: 10,
    flexGrow: 1,
    height: 530
  },
  scrollView: {
    flexGrow: 1,
    flexShrink: 1
  },
  yellView: {
    marginTop: 10,
    overflow: 'hidden',
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "white",
    height: 80
  },
  yellViewExpanded: {
    height: 'auto'
  },
  yellText: {
    padding: 5
  },
  yellTextStyle: {
    fontFamily: "Cochin"
  },
  commentBox: {
    marginTop: 20,
    padding: 10
  },
  commentBoxInput: {
    minHeight: 48,
    marginBottom: 10,
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  commentItem: {
    padding: 10
  },
  commentAuthor: {
    fontWeight: 'bold'
  },
  yellFooter: {
    padding: 5,
    paddingTop: 15,
    flexDirection: "row"
  },
  yellLike: {
    flex: 1,
    fontFamily: "Cochin"
  },
  yellComment: {
    flex: 1,
    fontFamily: "Cochin"
  },
  likeIcon: {
    marginTop: -5,
    marginLeft: 40,
    width: 30,
    height: 30
  },
  commentIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
    marginLeft: 30
  }
});

function mapStateToProps(state) {
  return {
    appData: state.appData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
    fetchComments: (id) => {
      fetch('https://yell-server-side.herokuapp.com/comment/'+id)
        .then(result => {
          result.json()
            .then((data) => dispatch(Actions.fetchCommentsSuccess(data)));
        })
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
