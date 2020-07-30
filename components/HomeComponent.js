import React, { Component } from 'react';
import { View, Text, Animated, Modal, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        promotions: state.promotions,
        partners: state.partners
    };
};

function RenderItem(props) {
    const {item} = props;

    if (props.isLoading) {
        return <Loading />;
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    if (item) {
        return (
            <TouchableOpacity 
            onPress={() => props.onShowModal()}>
                <Card
                    borderRadius={14}
                    featuredTitle={item.name}
                    image={{uri: baseUrl + item.image}}>
                    
                    <Text
                        style={{margin: 10}}>
                        {item.description}
                    </Text>
                </Card>
            </TouchableOpacity>
        );
    } else {
        return (
        <Card
            borderRadius={14}
            title='Start Your Journey'
            image={require('./images/start-journey.jpg')}
            >
            <Text
                style={{margin: 10}}>
                Begin your journey!
            </Text>
        </Card>
        );
     }

}

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            scaleValue: new Animated.Value(.8),
            showModal: false, 
            rating: 5, 
            author: '', 
            text: ''
        };
    }
/**************ANIMATION*******************/
    animate() {
        Animated.timing(
            this.state.scaleValue,
            {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true
            }
        ).start();
    }

    componentDidMount() {
        this.animate();
    }
/******************************************/
/**************MODAL*******************/
toggleModal() {
    this.setState({showModal: !this.state.showModal});
}
resetForm() {
    this.setState({
        showModal: false,
        rating: 5,
        author: '',
        text: ''
    });
}
/**************************************/
/*********HEADER TITLE***********/
    static navigationOptions = {
        title: 'HikerPen'
    }
/********************************/

    render() {
        return(
            <Animated.ScrollView style={{transform: [{scale: this.state.scaleValue}]}}>
                <RenderItem
                    item={this.props.campsites.campsites.filter(campsite => campsite.featured)[3]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                    onShowModal={() => this.toggleModal()}
                />
                <RenderItem
                    item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess} 
                />
                <RenderItem
                    item={this.props.partners.partners.filter(partner => partner.featured)[0]}
                    isLoading={this.props.partners.isLoading}
                    errMess={this.props.partners.errMess} 
                />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            startingValue={this.state.rating}
                            imageSize={40}
                            onFinishRating={(rating)=>this.setState({rating: rating})} 
                            style={{paddingVertical: 10}}
                        />
                        <Input
                            placeholder='Author'
                            leftIcon={{type: 'font-awesome', name: 'user-o'}}
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={(author)=>this.setState({author: author})}
                            value={this.state.author}
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={{type: 'font-awesome', name: 'comment-o'}}
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={(comment)=>this.setState({comment: comment})}
                            value={this.state.comment}
                        />
                        <View>
                            <Button
                                title='Submit'
                                color='#5637DD'
                                onPress={() => {
                                    this.handleComment(campsiteId);
                                    this.resetForm();
                                }}
                            />
                        </View>
                        <View style={{margin: 10}}>
                            <Button
                                onPress={() => {
                                    this.toggleModal();
                                    this.resetForm();
                                }}
                                color='#808080'
                                title='Cancel'
                            />
                        </View>
                    </View>
                </Modal>
            </Animated.ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20 
    },
    cardItem: {
        flex: 1,
        margin: 10
    }, 
    modal: {
        justifyContent: 'center', 
        margin: 10
    }
})

export default connect(mapStateToProps)(Home);