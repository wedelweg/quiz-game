//
// import UserData from "./UserData.tsx";
// import ScoreData from "./ScoreData.tsx";
//
// const PageHeader = () => {
//
//     return (
//         <div className="bg-[#1f1f6b] border-custom p-4 mb-6 animate-fade-in-up">
//             <div className="flex justify-between items-center">
//                 <div className="animate-slide-in-left">
//                     <ScoreData />
//                 </div>
//                 <div className="text-center">
//                     <h1 className="text-2xl font-bold text-yellow-400 tracking-wider animate-pulse-glow">
//                         Own Game
//                     </h1>
//                 </div>
//                 <div className="animate-slide-in-right">
//                     <UserData />
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default PageHeader;

import ScoreData from "./ScoreData";
import UserData from "./UserData";

const PageHeader = () => {
    return (
        <div className="w-full max-w-5xl bg-[#1f1f6b] border-custom py-2 px-4 mb-4 animate-fade-in-up rounded-lg mx-auto">
        <div className="flex justify-between items-center">
                <ScoreData />
                <h1 className="text-2xl font-bold text-yellow-400 tracking-wider animate-pulse-glow text-center">
                    Own Game
                </h1>
                <UserData />
            </div>
        </div>
    );
};

export default PageHeader;
