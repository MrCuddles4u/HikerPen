import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Settings extends Component {

/*********HEADER TITLE***********/
    static navigationOptions = {
        title: 'Settings'
    };

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['campsites@nucamp.co'],
            subject: 'Inquiry',
            body: 'To whom it may concern:'
        })
    }

    


    render() {
        return (
            <ScrollView>
                    <Animatable.View animation='fadeInDown' duration={2000} delay={1000} useNativeDriver={true}>
                        <Card
                            title='Settings'
                            wrapperStyle={{margin: 20}}
                            >
                                <Text>This does not work currently</Text>
                                <Button
                                    title="Dark Mode"
                                    buttonStyle={{backgroundColor: '#5637DD', margin: 40}}
                                    icon={<Icon
                                        name='moon-o'
                                        type='font-awesome'
                                        color='#fff'
                                        iconStyle={{marginRight: 10}}
                                    />}
                                    onPress={() => this.sendMail()}
                                />
                        </Card>
                    </Animatable.View>
            </ScrollView>
        );
    }
}

export default Settings;