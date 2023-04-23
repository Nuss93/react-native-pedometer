import { View, Text, Modal, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Styles, root } from '../stylesheet';

const styles = StyleSheet.create(Styles)
export default function ModalPopUp(props) {
  return (
    <Modal
        animationType='slide'
        visible={props.modalVisible}
        transparent={true}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22,
        }}>
          <View
            style={{
              margin: 20,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 25,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text>This function is still a work in progress!</Text>
            <Pressable style={{...styles.padding10, marginTop:15, backgroundColor: root.primary, borderRadius:10}} onPress={() => {props.childSetModalVisible()}}>
              <Text style={{color:'#fff'}}>Close modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    
  )
}
