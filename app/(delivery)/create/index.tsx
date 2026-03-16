import Button from '@/components/ui/button';
import Header from '@/components/ui/header';
import CustomImagePicker from '@/components/ui/image-picker';
import Input from '@/components/ui/input';
import Layout from '@/components/ui/layout';
import useCreateVehicle from '@/hooks/delivery/useCreateVehicle';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function CreateVehicle() {
  const {
    formik,
    t,
    isArabic,
    showDatePicker,
    setShowDatePicker,
    handleDateChange
  } = useCreateVehicle();

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Layout>
      <Header title={t('vehicle.create') || 'Create Vehicle'} />
      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        <Text className={`text-black dark:text-white text-center mb-6`}>
          {t('vehicle.createSubtitle') || 'Add a new vehicle to your profile'}
        </Text>

        <View className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6 mb-6">
          {/* Vehicle Info */}
          <View className="mb-6">
            <View className={`flex-row items-center mb-4 ${isArabic ? 'flex-row-reverse' : 'text-left'}`}>
              <Ionicons name="car-outline" size={24} color="#fd4a12" />
              <Text className="text-lg font-semibold text-gray-800 dark:text-white ml-2">
                {t('vehicle.information') || 'Vehicle Information'}
              </Text>
            </View>
            <View className="h-1 w-20 bg-primary rounded mb-4" />

            <Input
              label={t('vehicle.plateNumber') || 'Plate Number *'}
              placeholder="ABC-12344"
              value={formik.values.plateNumber}
              onChangeText={formik.handleChange('plateNumber')}
              error={formik.touched.plateNumber && formik.errors.plateNumber ? String(formik.errors.plateNumber) : undefined}
            />

            <Input
              label={t('vehicle.type') || 'Type *'}
              placeholder="Motorbike, Car, etc."
              value={formik.values.type}
              onChangeText={formik.handleChange('type')}
              error={formik.touched.type && formik.errors.type ? String(formik.errors.type) : undefined}
            />

            <Input
              label={t('vehicle.model') || 'Model *'}
              placeholder="Honda 2022"
              value={formik.values.model}
              onChangeText={formik.handleChange('model')}
              error={formik.touched.model && formik.errors.model ? String(formik.errors.model) : undefined}
            />

            <Input
              label={t('vehicle.capacity') || 'Capacity *'}
              placeholder="50"
              keyboardType="numeric"
              value={formik.values.capacity.toString()}
              onChangeText={formik.handleChange('capacity')}
              error={formik.touched.capacity && formik.errors.capacity ? String(formik.errors.capacity) : undefined}
            />

            <Input
              label={t('vehicle.color') || 'Color *'}
              placeholder="Red"
              value={formik.values.color}
              onChangeText={formik.handleChange('color')}
              error={formik.touched.color && formik.errors.color ? String(formik.errors.color) : undefined}
            />
          </View>

          {/* License & Insurance */}
          <View className="mb-6">
            <View className={`flex-row items-center mb-4 ${isArabic ? 'flex-row-reverse' : 'text-left'}`}>
              <Ionicons name="document-text-outline" size={24} color="#fd4a12" />
              <Text className="text-lg font-semibold text-gray-800 dark:text-white ml-2">
                {t('vehicle.licenseAndInsurance') || 'License & Insurance'}
              </Text>
            </View>
            <View className="h-1 w-20 bg-primary rounded mb-4" />

            <Input
              label={t('vehicle.license') || 'License Number *'}
              placeholder="L123456"
              value={formik.values.license}
              onChangeText={formik.handleChange('license')}
              error={formik.touched.license && formik.errors.license ? String(formik.errors.license) : undefined}
            />

            <Input
              label={t('vehicle.insurance') || 'Insurance Number *'}
              placeholder="I123456"
              value={formik.values.insurance}
              onChangeText={formik.handleChange('insurance')}
              error={formik.touched.insurance && formik.errors.insurance ? String(formik.errors.insurance) : undefined}
            />

            {/* Insurance Date */}
            <Text className={`mb-2 mx-1 text-base block font-medium text-black dark:text-white`}>
              {t('vehicle.insuranceDate') || 'Insurance Date *'}
            </Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className={`flex-row items-center rounded-xl px-4 py-3 mb-4 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-50 border border-gray-200'
                }`}
            >
              <Ionicons name="calendar-outline" size={20} color={isDark ? '#9CA3AF' : '#6B7280'} style={{ marginRight: 8 }} />
              <Text className={`flex-1 text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {formik.values.insurance_date.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {formik.touched.insurance_date && formik.errors.insurance_date && (
              <Text className="text-red-500 text-sm mt-1 mb-4 ml-1">
                {String(formik.errors.insurance_date)}
              </Text>
            )}

            {showDatePicker && (
              <DateTimePicker
                value={formik.values.insurance_date}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
              />
            )}
          </View>

          {/* Image */}
          <View className="mb-6">
            <View className={`flex-row items-center mb-4 ${isArabic ? 'flex-row-reverse' : 'text-left'}`}>
              <Ionicons name="image-outline" size={24} color="#fd4a12" />
              <Text className="text-lg font-semibold text-gray-800 dark:text-white ml-2">
                {t('vehicle.image') || 'Vehicle Image'}
              </Text>
            </View>
            <View className="h-1 w-20 bg-primary rounded mb-4" />

            <CustomImagePicker
              label={t('vehicle.uploadImage') || 'Upload Vehicle Image'}
              placeholder={t('vehicle.tapToUpload') || 'Tap to select an image'}
              value={formik.values.image}
              onImageSelect={(uri) => formik.setFieldValue('image', uri)}
              error={formik.touched.image && formik.errors.image ? String(formik.errors.image) : undefined}
              touched={formik.touched.image}
            />
          </View>

          <View className="mt-4 mb-10">
            <Button
              size='lg'
              disabled={formik.isSubmitting}
              title={t('common.submit') || 'Submit'}
              onPress={() => formik.handleSubmit()}
            />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
