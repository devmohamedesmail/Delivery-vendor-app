import React from 'react'
import { View, Modal } from 'react-native'


export default function CustomModal(
    {
        visible,
        onClose,
        children,
        animation = "slide",
        overlayOpacity = 0.4,
    }: any
) {
   

    return (
        <Modal
            animationType={animation}
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View style={{ flex: 1, backgroundColor: `rgba(0,0,0,${overlayOpacity})`, justifyContent: 'flex-end' }}>

                {/* BOTTOM SHEET */}
                <View style={{
                    backgroundColor: "#fff",
                    width: '100%',
                    padding: 20,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    minHeight: 300,
                    borderColor: '#fff',
                    borderWidth: 0
                }}>
                    <View className={`w-12 h-1.5 rounded-full self-center mb-4 `} />

                    {children}


                </View>
            </View>
        </Modal>
    )
}
