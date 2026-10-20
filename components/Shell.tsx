import LabHeader from "./LabHeader";
import MoleculeFooter from "./MoleculeFooter";
export default function Shell({ path, children }: { path: string; children: React.ReactNode }) {
  return (<><LabHeader path={path} /><main>{children}</main><MoleculeFooter /></>);
}
