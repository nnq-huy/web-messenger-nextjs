import React, {useState} from "react";
import * as Yup from "yup";
import Image from "next/image";
import { query, collection, doc, where, limit, onSnapshot, setDoc } from "firebase/firestore";
import {db} from '@/config/firebase';
import { searchSchema } from "@/validations/user.search.validation";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "@/components/form-components/FormInput";
import { useAuth } from "@/context/AuthContext";
import SearchButton from "@/components/form-components/SearchButton";
import AuthSocialButton from "@/components/form-components/AuthSocialButton";
import { BsPersonAdd } from "react-icons/bs";
import { toast } from "react-hot-toast";

export const AddContact =  ()=> {
    type FormData = Yup.InferType<typeof searchSchema>;
    const methods = useForm<FormData>({ mode: "onBlur", resolver: yupResolver(searchSchema) });
	const {
        watch,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = methods;

    const [result, setResult] = useState({email:'', uid:'', displayName:'',photoURL:''})
    const {user} = useAuth();
    const contactsRef = collection(db,'users/'+user.uid+'/contacts');
    const usersRef = collection (db, 'users');

    const watchEmail = watch().email;

    const onSubmit = (data: FormData) => {
        const q = query(usersRef, where('email', '==', watchEmail), limit(1));
            onSnapshot(q,(QuerySnapshot)=>{
                if(!QuerySnapshot.empty){
                    const res = QuerySnapshot.docs[0].data();
                setResult({email: res['email'],uid: res['uid'],displayName: res['displayName'], photoURL:res['photoURL']});
                } else {
                    setResult({email:'', uid:'', displayName:'', photoURL:''})
                }
            });
	};

    const addPerson = async ()=>{
        const newContactPath = 'users/'+user.uid+'/contacts/'+result.uid;
        const toastId = toast.loading("Adding contact...");

		try {
            await setDoc(doc(db,newContactPath),result);
            toast.success("Successfully added contact", { id: toastId });
		} catch (error: any) {
			toast.error(error.message, { id: toastId });
		}
    }

    return (
        <div className="bg-gray-100 dark:bg-slate-700 min-w-full min-h-screen py-1">            <FormProvider {...methods}>
                <form
		            action=""
			        className="w-96 mx-auto pb-12"
			        onSubmit={handleSubmit(onSubmit)}
		        >
                    <FormInput
					    label="Enter user email to search"
					    name="email"
					    type="email"
					    formOptions={searchSchema.fields.email}
					    errors={errors.email}
			        />
                    <SearchButton/>
                </form>
            </FormProvider>

            {result.uid!==''?
                <div className="w-96 bg-white dark:bg-gray-200 rounded-md shadow-lg flex justify-center items-center">
                    <div className="shrink-0 p-2">
                        <Image
                            placeholder="empty"
                            alt="profile picture"
                            height="64"
                            width="64"
                            className="w-auto rounded-full"
                            src={result.photoURL==""||!result.photoURL?'/images/avatar.webp':result.photoURL}
                        />
                    </div>
                <div>
            <div className="px-2 text-xl text-gray-700 font-medium">{result.displayName}</div>
            <p className="px-2 text-sm text-gray-500">{result.email}</p>
            </div>
            <div className="px-2 py-2">
                <AuthSocialButton
              		icon={BsPersonAdd}
              		onClick={() => addPerson()}
            	/>
            </div>
            </div>
            :<div className="text-center">No user found</div>}
    </div>
    );
}