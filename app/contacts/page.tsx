'use client'
import React, {useState} from "react";
import * as Yup from "yup";
import { query, collection, doc, where, limit, onSnapshot, setDoc } from "firebase/firestore";
import {db} from '@/app/config/firebase';
import { searchSchema } from "@/app/validations/user.search.validation";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "@/app/components/form-components/FormInput";
import { useAuth } from "@/app/context/AuthContext";
import SearchButton from "@/app/components/form-components/SearchButton";
import { toast } from "react-hot-toast";
import ProtectedRoute from "@/app/components/protected-route/page";
import { useRouter } from "next/navigation";
import { DASHBOARD } from "@/app/utils/constant/routes.constant";
import { PlaceHolderPage } from "@/app/components/PlaceHolder";
import { ResultCard } from "../components/ResultCard";
import { Contact } from "../models/contact";

const AddContactPage =  () => {
    type FormData = Yup.InferType<typeof searchSchema>;
    const methods = useForm<FormData>({ mode: "onBlur", resolver: yupResolver(searchSchema) });
	const {
        watch,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = methods;

    const [result, setResult] = useState<Contact>({email:'', uid:'', displayName:'',photoURL:''})
    const {user} = useAuth();
    const router = useRouter();

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

    const addContact = () => {
        const newContactPath = 'users/'+user.uid+'/contacts/'+result.uid;
        const toastId = toast.loading("Adding contact...");

		try {
             setDoc(doc(db,newContactPath),result);
            toast.success("Successfully added contact", { id: toastId });
		} catch (error: any) {
			toast.error(error.message, { id: toastId });
		}
    }

    if (user) {return (
        <ProtectedRoute>
        <div className="bg-gray-100 dark:bg-slate-700 min-w-full min-h-screen py-1">  
            <FormProvider {...methods}>
                <form
		            action=""
			        className="w-96 mx-auto pb-12 mt-20"
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
                <ResultCard contact={result} onClick={addContact}/>
            :<div className="text-center text-gray-600 dark:text-gray-200">No user found</div>}
        <div className="flex justify-center pt-8">
			<button
				type="button"
				className="h-12 text-center w-24 bg-indigo-600 rounded-md hover:shadow-lg hover:bg-indigo-800 text-lg transition"
                onClick={()=>{router.push(DASHBOARD)}}
			>
				<p className="capitalize text-gray-100 font-normal">back</p>
			</button>
		</div>
    </div>
    </ProtectedRoute>
    );} else {return (<div>
        <PlaceHolderPage/>
    </div>)
    }
}
export default AddContactPage;
