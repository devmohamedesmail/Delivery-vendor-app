
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/button';


export default function CategoryItem({ category, handleDelete }: any) {
    const { t } = useTranslation();
    const router = useRouter();
    return (
        <View
            key={category.id}
            className="bg-white dark:bg-card-dark rounded-xl p-4 shadow-sm w-[45%] m-2 relative"
        >

            {/* Header */}
            <View className="flex items-center justify-between ">
                <View className='bg-blue-400 w-16 h-16 rounded-full flex items-center justify-center mb-2'>
                    <Text className='text-xl text-white'>
                        {category.name.charAt(0).toUpperCase()}
                    </Text>
                </View>
                <Text className="text-lg font-bold text-black dark:text-white">
                    {category.name}
                </Text>
            </View>

            <View className="flex items-center justify-between space-x-2 mt-3 pt-3 border-t border-gray-100">

                <Button
                    variant="primary"
                    size="sm"
                    onPress={() =>
                        router.push({
                            pathname: "/categories/show",
                            params: { category_id: category.id.toString() },
                        })
                    }
                    title={t('categories.show_products')}
                    icon={<AntDesign name="eye" size={18} color="white" />}
                    className='w-full mb-1'
                     />

                <Button
                    variant="primary"
                    size="sm" onPress={() =>
                        router.push({
                            pathname: "/categories/update",
                            params: { data: JSON.stringify(category) },
                        })
                    }
                    title={t('categories.edit_category')} 
                    icon={<Ionicons name="create-outline" size={18} color="white" />}
                    className='w-full'
                    />



               


            </View>

             <TouchableOpacity
                    onPress={() => handleDelete(category.id)}
                    className='bg-red-600 w-12 h-12 absolute top-0 right-0 rounded-full flex flex-row justify-center items-center'>
                    <Ionicons name="trash-outline" size={18} color="white" />
                </TouchableOpacity>
        </View>
    )
}
