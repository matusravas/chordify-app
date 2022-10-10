import React, { FC, useState, useEffect, useRef } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, useWindowDimensions, View, TouchableOpacity, TouchableNativeFeedback } from "react-native"
import axios from 'axios';
// import Icon from 'react-native-vector-icons'

import RenderHtml from "react-native-render-html";
import { HStack, VStack, Text, Button, Snackbar, TextInput, Chip, IconButton } from '@react-native-material/core';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Icon, { Icons } from '../icons/icons';