import { collection, onSnapshot, query } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UseCurrentUser } from "../config/CurrentUserContext";
import { db } from "../config/firebaseConfig";

export default function MakeMember() {
    const { user } = UseCurrentUser();
    const { wID } = useParams() 
    const [ members, setMembers ] = useState([])

    const userID = user ? user.uid : "Loading"

    useEffect(() => {
        const q = query(collection(db, "workspaces"));
        onSnapshot(q, (docs) => {
            let array = []
            docs.forEach(doc => {
                array.push({ ...doc.data(), id: doc.id });
            });
            for(var i=0; i<array.length; i++){
                if(array[i].id === wID){
                    
                    setMembers(array[i].members);
                }
            }
        })
    }, [userID])

    return (
        <div className="w-4/5 ">
            <div className="flow-root mt-6">
                <ul className="-my-5 divide-y divide-gray-200">
                    {members.map((member) => (
                        <li key={member.memberId} className="py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="h-8 w-8 rounded-full" src="https://picsum.photos/200" alt="" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{member.memberName}</p>
                                    <p className="text-sm text-gray-500 truncate">{'@' + member.memberName}</p>
                                </div>
                                <div className="gap-4">
                                    <div className="gap-4">
                                    {member.isAdmin ? (
                                            <span href="" className="bg-yellow-300 inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700">
                                                Admin
                                            </span>
                                        
                                    ) : ""}
                                    <a
                                        href="#"
                                        className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        View
                                    </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
