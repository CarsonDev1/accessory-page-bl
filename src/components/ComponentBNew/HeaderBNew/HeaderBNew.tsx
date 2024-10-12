import Image from "next/image";
import headerPC from "../../../../public/BnewPC.png"
export default function HeaderBNew() {
    return (
        <div>
            <Image src={headerPC} alt="" />
        </div>
    );
}
