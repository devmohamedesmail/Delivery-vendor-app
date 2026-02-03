import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Input from '@/components/ui/input'
import { AuthContext } from '@/context/auth-provider'
import Button from '@/components/ui/button'
import { useRouter } from 'expo-router'
import Toast from 'react-native-toast-message'
import AuthLayout from '@/components/screens/auth/auth-layout'
import AuthHeader from '@/components/screens/auth/auth-header'
import TabButton from '@/components/ui/tab-button'



interface RegisterFormValues {
    name: string
    email: string
    phone: string
    password: string
    role_id: number | string
}

export default function Register() {
    const { t, i18n } = useTranslation()
    const [isLoading, setIsLoading] = useState(false)
    const { register } = useContext(AuthContext)
    const router = useRouter()
    const [registerMethod, setRegisterMethod] = useState<'email' | 'phone'>('email')


    // const validationSchema = Yup.object({
    //     name: Yup.string()
    //         .min(2, t('auth.name_required'))
    //         .required(t('auth.name_required')),
    //     email: registerMethod === 'email'
    //         ? Yup.string().email(t('auth.email_invalid')).required(t('auth.email_required'))
    //         : Yup.string().notRequired(),
    //     phone: registerMethod === 'phone'
    //         ? Yup.string().matches(/^[0-9]{10,15}$/, t('auth.phone_invalid')).required(t('auth.phone_required'))
    //         : Yup.string().notRequired(),
    //     password: Yup.string()
    //         .min(6, t('auth.password_min'))
    //         .required(t('auth.password_required')),
    //     role_id: Yup.number()
    //         .oneOf([3, 5], t('auth.role_required'))
    //         .required(t('auth.role_required'))
    // })

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, t('auth.name_required'))
            .required(t('auth.name_required')),

        email: Yup.string().when('registerMethod', {
            is: 'email',
            then: (schema) =>
                schema
                    .email(t('auth.email_invalid'))
                    .required(t('auth.email_required')),
            otherwise: (schema) => schema.notRequired().nullable(),
        }),

        phone: Yup.string().when('registerMethod', {
            is: 'phone',
            then: (schema) =>
                schema
                    .matches(/^[0-9]{10,15}$/, t('auth.phone_invalid'))
                    .required(t('auth.phone_required')),
            otherwise: (schema) => schema.notRequired().nullable(),
        }),

        password: Yup.string()
            .min(6, t('auth.password_min'))
            .required(t('auth.password_required')),

        role_id: Yup.number()
            .oneOf([3, 5], t('auth.role_required'))
            .required(t('auth.role_required')),
    })


    const formik = useFormik<RegisterFormValues>({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            role_id: 3,
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true)

            try {
                // Determine identifier based on active tab
                const identifier = registerMethod === 'email' ? values.email : values.phone;

                const result = await register(values.name, identifier, values.password, values.role_id)
                if (result.success) {

                    Toast.show({
                        type: 'success',
                        text1: t('auth.registration_success'),
                        position: 'top',
                        visibilityTime: 3000,
                    });

                    if (values.role_id === 3) {
                        router.push('/(store)/create')
                    } else if (values.role_id === 5) {
                        // router.push('/(driver)/driver/create')
                    }
                } else {
                    Toast.show({
                        type: 'error',
                        text1: t('auth.registration_failed'),
                        position: 'top',
                        visibilityTime: 3000,
                    });

                }


            } catch (error) {
                Alert.alert('Error', 'Network error. Please try again.')
            } finally {
                setIsLoading(false)
            }
        }
    })

    // Update formik validation when method changes
    useEffect(() => {
        formik.validateForm();
    }, [registerMethod]);


    return (

        <AuthLayout>
            <AuthHeader title={t('auth.createAccount')} description={t('auth.registerDescription')} />

            <View className="flex-1 px-6 rounded-t-3xl -mt-6 bg-white pt-10">

                {/* Tabs for Email/Phone */}
                <View className="flex-row mb-6 ">
                    {/* <TouchableOpacity
                        activeOpacity={1}
                        className={`flex-1 pb-3 ${registerMethod === 'email' ? 'border-b-2 border-primary' : 'border-b-2 border-gray-200'}`}
                        onPress={() => setRegisterMethod('email')}
                    >
                        <Text className={`text-center font-medium ${registerMethod === 'email' ? 'text-primary' : 'text-gray-500'}`}>
                            {t('auth.email')}
                        </Text>
                    </TouchableOpacity> */}
                    <TabButton
                        label={t('auth.email')}
                        onPress={() => setRegisterMethod('email')}
                        active={registerMethod === 'email'}
                    />
                    <TabButton
                        label={t('auth.phone')}
                        onPress={() => setRegisterMethod('phone')}
                        active={registerMethod === 'phone'}
                    />
                    {/* <TouchableOpacity
                        activeOpacity={1}
                        className={`flex-1 pb-3 ${registerMethod === 'phone' ? 'border-b-2 border-primary' : ''}`}
                        onPress={() => setRegisterMethod('phone')}
                    >
                        <Text className={`text-center font-medium ${registerMethod === 'phone' ? 'text-primary' : 'text-gray-500'}`}>
                            {t('auth.phone')}
                        </Text>
                    </TouchableOpacity> */}
                </View>

                {/* Name Input */}
                <Input
                    label={t('auth.name')}
                    placeholder={t('auth.enterName')}
                    type="text"
                    value={formik.values.name}
                    onChangeText={formik.handleChange('name')}
                    error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
                />

                {/* Conditional Input based on Tab */}
                {registerMethod === 'email' ? (
                    <Input
                        label={t('auth.email')}
                        placeholder={t('auth.enterEmail')}
                        type="email"
                        keyboardType="email-address"
                        value={formik.values.email}
                        onChangeText={formik.handleChange('email')}
                        error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
                    />
                ) : (
                    <Input
                        label={t('auth.phone')}
                        placeholder={t('auth.enterPhone')}
                        type="phone"
                        keyboardType="phone-pad"
                        value={formik.values.phone}
                        onChangeText={formik.handleChange('phone')}
                        error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : undefined}
                    />
                )}

                {/* Password Input */}
                <Input
                    label={t('auth.password')}
                    placeholder={t('auth.enterPassword')}
                    type="password"
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                    error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
                />

                {/* Role Selection */}
                {/* <RoleOptions formik={formik} /> */}


                <View className='mt-10'>
                    <Button
                        variant="primary"
                        size='lg'
                        title={isLoading ? t('auth.wait') : t('auth.next')}
                        onPress={() => formik.handleSubmit()}
                        disabled={isLoading || !formik.isValid || !formik.dirty}
                    />
                </View>


                {/* Terms and Sign In Link */}
                <View className="mb-10 py-10">
                    <View className="flex-row justify-center items-center">
                        <Text className="text-gray-600 ">{t('auth.alreadyHaveAccount')} </Text>
                        <TouchableOpacity onPress={() => router.push('/auth/login')}>
                            <Text className="text-primary ">{t('auth.signIn')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </AuthLayout>
    )
}
