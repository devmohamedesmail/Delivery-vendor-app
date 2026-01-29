
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';


export default function CategoryItem({ category, handleDelete }:any) {
    const { t } = useTranslation();
    const router = useRouter();
    return (
        <View
            key={category.id}
            className="bg-white rounded-xl p-4 shadow-sm w-[45%] m-2"
        >

            {/* Header */}
            <View className="flex items-center justify-between ">

                <View className='bg-blue-400 w-16 h-16 rounded-full flex items-center justify-center mb-2'>
                    <Text className='text-xl text-white'>
                        {category.name.charAt(0).toUpperCase()}
                    </Text>
                </View>
                <Text className="text-sm font-bold text-black">
                    {category.name}
                </Text>
            </View>

            <View className="flex flex-row  items-center justify-between space-x-2 mt-3 pt-3 border-t border-gray-100">
                <TouchableOpacity
                    onPress={() =>
                        router.push({
                            pathname: "/categories/show",
                            params: { category_id: category.id.toString() },
                        })
                    }
                    className='bg-primary w-12 h-12 rounded-full flex flex-row justify-center items-center'>
                    <AntDesign name="eye" size={18} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        router.push({
                            pathname: "/categories/update",
                            params: { data: JSON.stringify(category) },
                        })
                    }
                    className='bg-green-600 w-12 h-12 rounded-full flex flex-row justify-center items-center'>
                    <Ionicons name="create-outline" size={18} color="white" />
                </TouchableOpacity>

            

                <TouchableOpacity
                    onPress={() => handleDelete(category.id)}
                    className='bg-red-600 w-12 h-12 rounded-full flex flex-row justify-center items-center'>
                    <Ionicons name="trash-outline" size={18} color="white" />
                </TouchableOpacity>

                
            </View>
        </View>
    )
}
