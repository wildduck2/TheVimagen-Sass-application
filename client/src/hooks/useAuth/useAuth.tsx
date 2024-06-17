// import { supabase } from '../../supabase/supabase'
// import { useAuthEmailProps, useAuthGithubProps } from '..'
// import { toast } from 'sonner'
// import { useEffect, useState } from 'react'
// import { signin } from '../../context/Data/Data'
// import { signupPopup } from '../../utils'
//
// export const useSigninWithEmaila = ({ email, password, dispatch, setIsLoading, route }: useAuthEmailProps) => {
//   const [creditValidEmail, setCreditValidEmail] = useState<boolean>(false)
//   const authEmail = async (e: React.SyntheticEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//
//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({ email, password })
//
//       if (error) {
//         toast.error(`Credentials didn't pass authentication check.`)
//         setCreditValidEmail(false)
//         setIsLoading(false)
//       }
//
//       if (!error && data) {
//         dispatch(signin())
//         toast.success('Access granted, authentication successful.')
//         setCreditValidEmail(true)
//         setIsLoading(false)
//       }
//     } catch (error) {
//       throw new Error(error as string)
//     }
//   }
//
//   useEffect(() => {
//     if (creditValidEmail) {
//       route('/')
//     }
//   }, [creditValidEmail])
//
//   return { creditValidEmail, authEmail } as const
// }
//
// export const useSigninwithGithub = ({
//   dispatch,
//   setIsLoading,
//   setEmailValid,
//   setPasswordValid,
//   route,
// }: useAuthGithubProps) => {
//   const [creditValidGithub, setCreditValidGithub] = useState<boolean>(false)
//   const authGithub = async () => {
//     setIsLoading(true)
//
//     try {
//       const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: 'github',
//         options: {
//           skipBrowserRedirect: true,
//         },
//       })
//
//       const promise = await signupPopup({
//         url: data.url!,
//       })
//
//       if (error) {
//         setEmailValid(true)
//         setPasswordValid(true)
//         setCreditValidGithub(false)
//         setIsLoading(false)
//       }
//
//       if (!error && promise) {
//         dispatch(signin())
//         setCreditValidGithub(true)
//         setIsLoading(false)
//       }
//     } catch (error) {
//       setIsLoading(false)
//       throw new Error(error as string)
//     }
//   }
//
//   useEffect(() => {
//     if (creditValidGithub) {
//       route('/')
//     }
//   }, [creditValidGithub])
//
//   return { creditValidGithub, authGithub } as const
// }
//
// export const useSignupWithEmailss = ({
//   email,
//   password,
//   dispatch,
//   setIsLoading,
//   setEmailValid,
//   setPasswordValid,
//   route,
// }: useAuthEmailProps) => {
//   const [creditValidEmail, setCreditValidEmail] = useState<boolean>(false)
//   const authEmail = async (e: React.SyntheticEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//
//     try {
//       const { data, error } = await supabase.auth.signUp({ email, password })
//
//       if (error) {
//         toast.error(`Credentials didn't pass authentication check.`)
//         setEmailValid(true)
//         setPasswordValid(true)
//         setCreditValidEmail(false)
//         setIsLoading(false)
//       }
//
//       if (!error && data) {
//         dispatch(signin())
//         toast.success('Access granted, authentication successful.')
//         setCreditValidEmail(true)
//         setIsLoading(false)
//       }
//     } catch (error) {
//       throw new Error(error as string)
//     }
//   }
//
//   useEffect(() => {
//     if (creditValidEmail) {
//       route('/')
//     }
//   }, [creditValidEmail])
//
//   return { creditValidEmail, authEmail } as const
// }