import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { Images } from '../../../assets/images';
import { colors } from '../../../assets/strings';

const Dots = ({ selected }) => {
    let backgroundColor;

    backgroundColor = selected ? colors.red : colors.accent;

    return (
        <View
            style={{
                width: selected ? 16 : 6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor,
                borderRadius: 6
            }}
        />
    );
}

const Skip = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16, color: colors.accent }}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16, color: colors.accent }}>Next</Text>
    </TouchableOpacity>
);

const Done = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16, color: colors.red }}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = () => {
    const { replace } = useNavigation();
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            onSkip={() => replace("SplashScreen")}
            onDone={() => replace("SplashScreen")}
            titleStyles={{ paddingBottom: 40, color: colors.white }}
            subTitleStyles={{ fontSize: 18, color: colors.white }}
            containerStyles={{ backgroundColor: colors.accent }}
            bottomBarColor={'#fff'}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image style={{ height: 300, width: 310 }} resizeMode={'contain'} source={Images.onboarding} />,
                    title: 'Select a restaurant',
                    subtitle: 'Let find the nearest restaurant around you.',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image style={{ height: 300, width: 310 }} resizeMode={'contain'} source={Images.onboarding2} />,
                    title: 'Order which food you like',
                    subtitle: 'Select your favorite food and order it.',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image style={{ height: 300, width: 310 }} resizeMode={'contain'} source={Images.onboarding3} />,
                    title: 'Deliver to your home',
                    subtitle: "The order will be delivered as soon as possible!",
                },
            ]}
        />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({

});
