import Image from "next/image"

interface AvatarProps {
    photoURL?: string
}
export const Avatar:React.FC<AvatarProps> = ({photoURL})=>{
    return (
        <div className="shrink-0">
            <Image
                alt="profile picture"
                height="64"
                width="64"
                className="object-cover w-12 h-12 rounded-full"
                src={photoURL==""||!photoURL?'/images/avatar.webp':photoURL}
            />
        </div>
    )
}



