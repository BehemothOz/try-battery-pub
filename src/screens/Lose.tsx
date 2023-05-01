import { Layout } from 'layout';
import { AppBar } from 'layout/AppBar';

interface LoseProps {
    onStatusChange: () => void;
}

export const Lose = ({ onStatusChange }: LoseProps) => {
    return (
        <Layout>
            <AppBar />
            <section className="flex flex-col w-full h-full justify-around text-center">
                <div>
                    <span className="block text-[32px] mb-6">
                        You're a <span className="text-red-500">LOSER</span>
                    </span>
                    <button className="uppercase" onClick={onStatusChange}>
                        born again
                    </button>
                </div>
            </section>
        </Layout>
    );
};
