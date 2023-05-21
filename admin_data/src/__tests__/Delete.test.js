
import {render} from "@testing-library/react"
import { Delete } from '../assest/svg/Delete';
import { Edit } from '../assest/svg/Edit';

it("render icon",async()=>{
    render(<Delete/>)
  })

  it("render icons",async()=>{
    render(<Edit/>)
  })