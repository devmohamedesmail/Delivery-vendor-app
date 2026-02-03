import AuthHeader from '@/components/screens/auth/auth-header'
import AuthLayout from '@/components/screens/auth/auth-layout'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import OTPInput from '@/components/ui/otp-input'
import TabButton from '@/components/ui/tab-button'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'

type Step = 1 | 2 | 3 | 4
type Method = 'email' | 'phone'

export default function ForgetPassword() {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [method, setMethod] = useState<Method>('email')
  const [isLoading, setIsLoading] = useState(false)
  const [identifier, setIdentifier] = useState('')
  const [otp, setOtp] = useState('')
  const [resendTimer, setResendTimer] = useState(0)

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  // Step 1: Send OTP
  const step1ValidationSchema = Yup.object({
    email: Yup.string().when('method', {
      is: 'email',
      then: (schema) => schema.email(t('auth.email_invalid')).required(t('auth.email_required')),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),
    phone: Yup.string().when('method', {
      is: 'phone',
      then: (schema) => schema.matches(/^[0-9]{10,15}$/, t('auth.phone_invalid')).required(t('auth.phone_required')),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),
  })

  const step1Formik = useFormik({
    initialValues: {
      email: '',
      phone: '',
      method: method,
    },
    validationSchema: step1ValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        const currentIdentifier = method === 'email' ? values.email : values.phone
        setIdentifier(currentIdentifier)

        Toast.show({
          text1: t('auth.otpSent'),
          text2: `${t('auth.otpSentTo')} ${maskIdentifier(currentIdentifier)}`,
          type: 'success',
        })

        setResendTimer(60)
        setCurrentStep(2)
      } catch (error) {
        Toast.show({
          text1: t('common.error'),
          text2: t('auth.passwordResetFailed'),
          type: 'error',
        })
      } finally {
        setIsLoading(false)
      }
    },
  })

  // Step 2: Verify OTP
  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      Toast.show({
        text1: t('common.error'),
        text2: t('auth.enterOTP'),
        type: 'error',
      })
      return
    }

    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      Toast.show({
        text1: t('auth.otpVerified'),
        type: 'success',
      })

      setCurrentStep(3)
    } catch (error) {
      Toast.show({
        text1: t('common.error'),
        text2: t('auth.otpInvalid'),
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Resend OTP
  const handleResendOTP = async () => {
    if (resendTimer > 0) return

    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      Toast.show({
        text1: t('auth.otpResent'),
        type: 'success',
      })

      setResendTimer(60)
      setOtp('')
    } catch (error) {
      Toast.show({
        text1: t('common.error'),
        text2: t('auth.passwordResetFailed'),
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Step 3: Reset Password
  const step3ValidationSchema = Yup.object({
    newPassword: Yup.string()
      .required(t('auth.password_required'))
      .min(6, t('auth.passwordMinLength')),
    confirmPassword: Yup.string()
      .required(t('auth.password_required'))
      .oneOf([Yup.ref('newPassword')], t('auth.passwordsDoNotMatch')),
  })

  const step3Formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: step3ValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        // TODO: Replace with actual API call to reset password
        await new Promise(resolve => setTimeout(resolve, 1500))

        Toast.show({
          text1: t('auth.passwordResetSuccess'),
          type: 'success',
        })

        setCurrentStep(4)

        // Auto redirect to login after 3 seconds
        setTimeout(() => {
          router.replace('/auth/login')
        }, 3000)
      } catch (error) {
        Toast.show({
          text1: t('common.error'),
          text2: t('auth.passwordResetFailed'),
          type: 'error',
        })
      } finally {
        setIsLoading(false)
      }
    },
  })

  // Update formik validation when method changes
  useEffect(() => {
    step1Formik.setFieldValue('method', method)
    step1Formik.validateForm()
  }, [method])

  // Helper function to mask email/phone
  const maskIdentifier = (value: string) => {
    if (method === 'email') {
      const [username, domain] = value.split('@')
      return `${username.slice(0, 2)}***@${domain}`
    } else {
      return `***${value.slice(-4)}`
    }
  }

  // Render progress indicator
  const renderProgressIndicator = () => (
    <View className="flex-row items-center justify-center mb-6 gap-2">
      {[1, 2, 3].map((step) => (
        <View key={step} className="flex-row items-center">
          <View
            className={`w-8 h-8 rounded-full items-center justify-center ${currentStep >= step ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
              }`}
          >
            {currentStep > step ? (
              <Ionicons name="checkmark" size={18} color="white" />
            ) : (
              <Text className={`font-bold ${currentStep >= step ? 'text-white' : 'text-gray-500'}`}>
                {step}
              </Text>
            )}
          </View>
          {step < 3 && (
            <View
              className={`w-12 h-1 mx-1 ${currentStep > step ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                }`}
            />
          )}
        </View>
      ))}
    </View>
  )

  // Step 1: Enter Email/Phone
  const renderStep1 = () => (
    <View className="space-y-4">
      {/* Tabs for Email/Phone */}
      <View className={`flex-row mb-6 border-b border-gray-200 dark:border-gray-700 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
        <TabButton
          label={t('auth.email')}
          onPress={() => setMethod('email')}
          active={method === 'email'}
        />
        <TabButton
          label={t('auth.phone')}
          onPress={() => setMethod('phone')}
          active={method === 'phone'}
        />
      </View>

      {/* Conditional Input based on Tab */}
      {method === 'email' ? (
        <Input
          label={t('auth.email')}
          placeholder={t('auth.enterEmail')}
          value={step1Formik.values.email}
          onChangeText={step1Formik.handleChange('email')}
          type="email"
          keyboardType="email-address"
          error={step1Formik.touched.email && step1Formik.errors.email ? step1Formik.errors.email : undefined}
        />
      ) : (
        <Input
          label={t('auth.phone')}
          placeholder={t('auth.enterPhone')}
          value={step1Formik.values.phone}
          onChangeText={step1Formik.handleChange('phone')}
          type="phone"
          keyboardType="phone-pad"
          error={step1Formik.touched.phone && step1Formik.errors.phone ? step1Formik.errors.phone : undefined}
        />
      )}

      {/* Send OTP Button */}
      <View className="mt-8">
        <Button
          variant="primary"
          size="lg"
          title={isLoading ? t('auth.sendingOTP') : t('auth.sendOTP')}
          onPress={() => step1Formik.handleSubmit()}
          disabled={isLoading || !step1Formik.isValid || !step1Formik.dirty}
        />
      </View>

      {/* Back to Login */}
      <TouchableOpacity onPress={() => router.back()} className="mt-4">
        <Text className="text-primary font-medium text-center">
          {t('auth.backToLogin')}
        </Text>
      </TouchableOpacity>
    </View>
  )

  // Step 2: Verify OTP
  const renderStep2 = () => (
    <View className="space-y-6">
      {/* Info Text */}
      <View className="mb-4">
        <Text className="text-gray-600 dark:text-gray-400 text-center mb-2">
          {t('auth.otpSentTo')}
        </Text>
        <Text className="text-black dark:text-white font-semibold text-center text-lg">
          {maskIdentifier(identifier)}
        </Text>
      </View>

      {/* OTP Input */}
      <View className="mb-6">
        <Text className="text-black dark:text-white font-medium mb-4 text-center">
          {t('auth.enterOTP')}
        </Text>
        <OTPInput
          value={otp}
          onChange={setOtp}
          length={6}
        />
      </View>

      {/* Verify Button */}
      <View className="mt-8">
        <Button
          variant="primary"
          size="lg"
          title={isLoading ? t('auth.verifyingOTP') : t('auth.verifyOTP')}
          onPress={handleVerifyOTP}
          disabled={isLoading || otp.length !== 6}
        />
      </View>

      {/* Resend OTP */}
      <View className="mt-6">
        <Text className="text-gray-600 dark:text-gray-400 text-center mb-2">
          {t('auth.didntReceiveOTP')}
        </Text>
        <TouchableOpacity
          onPress={handleResendOTP}
          disabled={resendTimer > 0 || isLoading}
          className="items-center"
        >
          <Text className={`font-semibold ${resendTimer > 0 ? 'text-gray-400' : 'text-primary'}`}>
            {resendTimer > 0
              ? `${t('auth.resendOTP')} (${resendTimer}s)`
              : t('auth.resendOTP')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  // Step 3: Reset Password
  const renderStep3 = () => (
    <View className="space-y-4">
      {/* New Password Input */}
      <Input
        label={t('auth.newPassword')}
        placeholder={t('auth.enterNewPassword')}
        value={step3Formik.values.newPassword}
        onChangeText={step3Formik.handleChange('newPassword')}
        type="password"
        error={
          step3Formik.touched.newPassword && step3Formik.errors.newPassword
            ? step3Formik.errors.newPassword
            : undefined
        }
      />

      {/* Confirm Password Input */}
      <Input
        label={t('auth.confirmPassword')}
        placeholder={t('auth.enterConfirmPassword')}
        value={step3Formik.values.confirmPassword}
        onChangeText={step3Formik.handleChange('confirmPassword')}
        type="password"
        error={
          step3Formik.touched.confirmPassword && step3Formik.errors.confirmPassword
            ? step3Formik.errors.confirmPassword
            : undefined
        }
      />

      {/* Reset Password Button */}
      <View className="mt-8">
        <Button
          variant="primary"
          size="lg"
          title={isLoading ? t('common.updating') : t('auth.resetPassword')}
          onPress={() => step3Formik.handleSubmit()}
          disabled={isLoading || !step3Formik.isValid || !step3Formik.dirty}
        />
      </View>
    </View>
  )

  // Step 4: Success
  const renderStep4 = () => (
    <View className="items-center justify-center py-12">
      {/* Success Icon */}
      <View className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 items-center justify-center mb-6">
        <Ionicons name="checkmark-circle" size={60} color="#22c55e" />
      </View>

      {/* Success Message */}
      <Text className="text-2xl font-bold text-black dark:text-white mb-2 text-center">
        {t('auth.passwordResetSuccess')}
      </Text>
      <Text className="text-gray-600 dark:text-gray-400 text-center mb-8">
        {t('auth.welcomeBack')}
      </Text>

      {/* Back to Login Button */}
      <Button
        variant="primary"
        size="lg"
        title={t('auth.backToLogin')}
        onPress={() => router.replace('/auth/login')}
      />
    </View>
  )

  return (
    <AuthLayout>
      <AuthHeader
        title={t('auth.resetPassword')}
        description={currentStep === 1 ? t('auth.resetPasswordDescription') : ''}
      />
      <View className="flex-1 px-6 rounded-t-3xl -mt-6 bg-white dark:bg-gray-900 pt-10">
        {/* Progress Indicator - Hide on success step */}
        {currentStep !== 4 && renderProgressIndicator()}

        {/* Step Content */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </View>
    </AuthLayout>
  )
}
