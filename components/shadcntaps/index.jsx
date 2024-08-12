  
 import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react";

    
const ReusableTabs = ({ tabsData, className }) => {
  
 
 return(<Tabs defaultValue="account" className="w-[400px]">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <div>
      <div>
        <div>Account</div>
        <div>
          Make changes to your account here. Click save when you're done.
        </div>
      </div>
      <div className="space-y-2">
        <div className="space-y-1">
          <div htmlFor="name">Name</div>
          <div id="name" defaultValue="Pedro Duarte" />
        </div>
        <div className="space-y-1">
          <div htmlFor="username">Username</div>
          <div id="username" defaultValue="@peduarte" />
        </div>
      </div>
      <div>
        <div>Save changes</div>
      </div>
    </div>
  </TabsContent>
  <TabsContent value="password">
    <div>
      <div>
        <div>Password</div>
        <div>
          Change your password here. After saving, you'll be logged out.
        </div>
      </div>
      <div className="space-y-2">
        <div className="space-y-1">
          <div htmlFor="current">Current password</div>
          <div id="current" type="password" />
        </div>
        <div className="space-y-1">
          <div htmlFor="new">New password</div>
          <div id="new" type="password" />
        </div>
      </div>
      <div>
        <div>Save password</div>
      </div>
    </div>
  </TabsContent>
</Tabs>)
 
};
  
  export default ReusableTabs;
    
 