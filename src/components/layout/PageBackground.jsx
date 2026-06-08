import { Starfield } from '../ui/starfield-1';
import './PageBackground.css';

export default function PageBackground() {
    return (
        <div className="page-bg" aria-hidden="true">
            <Starfield
                starColor="rgba(180,160,255,0.7)"
                bgColor="rgba(11,13,17,1)"
                speed={0.6}
                quantity={350}
                opacity={1}
            />
            <div className="page-bg__blob page-bg__blob--1" />
            <div className="page-bg__blob page-bg__blob--2" />
        </div>
    );
}
