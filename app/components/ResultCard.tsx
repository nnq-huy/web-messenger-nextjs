import { Contact } from '@/app/models/contact';
import Image from "next/image";
import AuthSocialButton from './form-components/AuthSocialButton';
import { BsPersonAdd } from 'react-icons/bs';

interface ResultCardProps {
    contact: Contact;
    onClick: () => void;
}
export const ResultCard : React.FC<ResultCardProps> = ({contact, onClick})=>{
    return (
        <div className="w-96 bg-white dark:bg-gray-200 rounded-lg shadow-lg flex justify-evenly items-center p-1 mx-auto">
            <div className="shrink-0 p-2">
                <Image
                    placeholder="empty"
                    alt="profile picture"
                    height="64"
                    width="64"
                    className="w-auto rounded-full"
                    src={contact.photoURL==""||!contact.photoURL?'/images/avatar.webp':contact.photoURL}
                />
            </div>
            <div>
            <div className="px-2 text-xl text-gray-700 font-medium">{contact.displayName}</div>
            <p className="px-2 text-sm text-gray-500">{contact.email}</p>
            </div>
            <div className="px-2 py-2">
                <AuthSocialButton
              		icon={BsPersonAdd}
              		onClick={onClick}
            	/>
            </div>
        </div>
    );

}
